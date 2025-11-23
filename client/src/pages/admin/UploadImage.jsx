import { useState } from 'react'
import adminService from '../../services/adminService'

function UploadImage() {
  const [ file, setFile ] = useState(null)
  const [ msg, setMsg ] = useState('')

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    console.log('', selectedFile)
    setFile(selectedFile)
    setMsg('')
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', file.className)
    formData.append('file', file)

    try {
      const res = await adminService.uploadImage((formData))
      setMsg(res.data.message || 'Image uploaded successfully')
    } catch (error) {
      setMsg('Upload image failed: ')
      console.log('Upload image failed: ', error.message)
    }
  }

  return (
    <section>
      <h2 className='text-primary'>Upload an image</h2>
      <div className="card mb-3">
        <div className='card-header bg-body-secondary'>
          Choose image to upload:
        </div>
        <div className='card-body'>
          {/* encType -  */}
          <form onSubmit={handleUpload} encType='multipart/form-data'>
            <div className='mb-2'>
              <label htmlFor='file'>Select Image to upload:</label>
              <input
                type='file'
                className='form-control'
                id='file'
                onChange={(e) => handleChange(e)}
              />
              {msg && <p>{msg}</p>}
            </div>
            <div className='d-grid gap-2'>
              <input type='submit' value='Upload Image' className='btn btn-info text-white'/>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UploadImage
