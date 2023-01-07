import assert from "assert"
import { db, timestamp, storage } from "../firebase/config.js"
import { genRandomId, formatBytes } from "../utils.js"
import { doc, setDoc, getDoc, arrayUnion } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import fs from "fs"

describe("Equivalence Testing", () => {
  // genRandomId
  describe("genRandomId()", () => {
    describe("should return empty string when input length is <= 0", () => {
      ;[-2, -1, 0].forEach((i) =>
        it(`should return empty string when input length is ${i}`, () => {
          assert.equal(genRandomId(i).length, 0)
        })
      )
    })

    describe("should return non-empty string when input length is > 0", () => {
      ;[1, 2, 3].forEach((i) =>
        it(`should return length ${i} string when input length ${i}`, () => {
          assert.equal(genRandomId(i).length, i)
        })
      )
    })
  })

  // formatBytes
  describe("formatBytes()", () => {
    describe("should return '0 Bytes' string when input bytes is <= 0", () => {
      ;[-2, -1, 0].forEach((i) =>
        it(`should return '0 Bytes' string when input bytes is ${i}`, () => {
          assert.equal(formatBytes(i), "0 Bytes")
        })
      )
    })

    describe("should return valid string when input bytes is > 0", () => {
      ;[
        [1, "1 Bytes"],
        [2 ** 10, "1 KB"],
        [2 ** 20, "1 MB"],
      ].forEach((i) =>
        it(`should return ${i[1]} when input bytes is ${i[0]}`, () => {
          assert.equal(formatBytes(i[0]), i[1])
        })
      )
    })
  })
})

describe("Boundary Value Testing", () => {
  // createRoom
  describe("createRoom()", () => {
    let createdAt
    const files = []
    beforeEach("set current timestamp", () => {
      createdAt = timestamp.fromDate(new Date())
    })

    it("error when input length is 5", async () => {
      const _roomId = genRandomId(5)
      const docRef = doc(db, "rooms", _roomId)
      await assert.rejects(async () => await setDoc(docRef, { createdAt, files }))
    })

    it("create room when input length is 6", async () => {
      const _roomId = genRandomId(6)
      const docRef = doc(db, "rooms", _roomId)
      await assert.doesNotReject(async () => await setDoc(docRef, { createdAt, files }))
    })

    it("error when input length is 7", async () => {
      const _roomId = genRandomId(7)
      const docRef = doc(db, "rooms", _roomId)
      await assert.rejects(async () => await setDoc(docRef, { createdAt, files }))
    })
  })

  // joinRoom
  describe("joinRoom()", () => {
    it("error when input length is 5", async () => {
      const _roomId = genRandomId(5)
      const docRef = doc(db, "rooms", _roomId)
      await assert.rejects(async () => await getDoc(docRef))
    })

    describe("check if room exist when input length is 6", () => {
      let roomId
      before("create a new room", async () => {
        const createdAt = timestamp.fromDate(new Date())
        const _roomId = genRandomId(6)
        const docRef = doc(db, "rooms", _roomId)
        await setDoc(docRef, { createdAt, files: [] })
        roomId = _roomId
      })

      it("room exists if room id is valid", async () => {
        const docRef = doc(db, "rooms", roomId)
        const room = await getDoc(docRef)
        assert.equal(room.exists(), true)
      })

      it("room doesn't exists if room id is invalid", async () => {
        const docRef = doc(db, "rooms", genRandomId(6))
        const room = await getDoc(docRef)
        assert.equal(room.exists(), false)
      })
    })

    it("error when input length is 7", async () => {
      const _roomId = genRandomId(7)
      const docRef = doc(db, "rooms", _roomId)
      await assert.rejects(async () => await getDoc(docRef))
    })
  })
})

describe("uploadFile()", () => {
  let roomId, fileUrl, docRef
  const filename = "testingFile.txt"
  before("create a new room", async () => {
    const createdAt = timestamp.fromDate(new Date())
    const _roomId = genRandomId(6)
    docRef = doc(db, "rooms", _roomId)
    await setDoc(docRef, { createdAt, files: [] })
    roomId = _roomId
  })

  it("upload file", async () => {
    const targetFile = fs.readFileSync(`test/${filename}`)
    const filePath = `files/${roomId}/${filename}`
    const fileRef = ref(storage, filePath)
    let file
    await assert.doesNotReject(async () => (file = await uploadBytes(fileRef, targetFile)))
    fileUrl = await getDownloadURL(file.ref)
  })

  it("checks room have zero file before update", async () => {
    const room = await getDoc(docRef)
    assert.equal(room.data().files.length, 0)
  })

  it("update room for file", async () => {
    await assert.doesNotReject(
      async () => await setDoc(docRef, { files: arrayUnion({ fileName: filename, url: fileUrl }) }, { merge: true })
    )
  })

  it("checks room have one files after update", async () => {
    const room = await getDoc(docRef)
    assert.equal(room.data().files.length, 1)
    assert.equal(room.data().files[0].fileName, filename)
    assert.equal(room.data().files[0].url, fileUrl)
  })
})
