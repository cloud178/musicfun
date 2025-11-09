import type { ChangeEvent } from 'react'
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/playlists/api/playlistsApi.ts'
import s from './PlaylistCover.module.css'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import type { Images } from '@/common/types'
import { Bounce, toast } from 'react-toastify'
import type { ToastOptions } from 'react-toastify'

const toastifyConfig: ToastOptions = {
  type: 'error',
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Bounce,
}

type Props = {
  playlistId: string
  images: Images
}

export const PlaylistCover = ({ playlistId, images }: Props) => {
  const originalCover = images.main.find((img) => img.type === 'original')
  const src = originalCover ? originalCover.url : defaultCover

  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation()

  const UploadPlaylistCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024 // 1 MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    const file = event.target.files?.length && event.target.files[0]

    if (!file) return

    if (file.size > maxSize) {
      toast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`, toastifyConfig)
      return
    }

    if (!allowedTypes.includes(file.type)) {
      toast('Only JPEG, PNG or GIF are allowed', toastifyConfig)
      return
    }

    uploadPlaylistCover({
      playlistId,
      file,
    })
  }

  const deleteCoverHandler = () => deletePlaylistCover({ playlistId })

  return (
    <>
      <img src={src} alt="cover" width={'240px'} className={s.cover} />
      <input type="file" accept={'image/jpeg,image/png,image/gif'} onChange={UploadPlaylistCoverHandler} />
      {originalCover && <button onClick={deleteCoverHandler}>delete cover</button>}
    </>
  )
}
