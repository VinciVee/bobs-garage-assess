import { useState } from 'react'
// Redux modules
import { useSelector, useDispatch } from 'react-redux'
import { selectImageList } from '../../slices/admin/adminSlice'
import { fetchImageURL } from '../../slices/admin/adminThunks'

function ChangeImage() {
  const imageList = useSelector(selectImageList)
  const dispatch = useDispatch()

  const [image, setImage] = useState('')
  console.log('imageList: ', imageList)

  const handleChange = (e) => {
    setImage(e.target.value)
  }

  const changeFile = (e) => {
    e.preventDefault(e)
    console.log('Changing file...', image)
    dispatch(fetchImageURL(image))
  }

  return (
    <section>
      <h2 className='text-primary'>Images</h2>
      <div className='mb-3'>
        <label htmlFor='fileList'>Select and Image:</label>
        <select id="fileList" value={image} onChange={handleChange}>
          <option value="">Please select an image</option>
          {
            imageList.map((imageName) => (
              <option key={imageName} value={imageName}>{imageName}</option>
            ))
          }
        </select>
      </div>
      <div className='mb-3'>
        <h2>Replace banner</h2>
        <p>Selected image: {image}</p>
        <div className='g-grid gap-2' onClick={changeFile}>
          <input type="button" value="Change Image" className='btn btn-info text-white' />
        </div>
      </div>
    </section>
  )
}

export default ChangeImage
