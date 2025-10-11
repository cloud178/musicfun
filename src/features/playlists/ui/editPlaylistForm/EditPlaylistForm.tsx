import type { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import type { UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { useUpdatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'

type Props = {
  playlistId: string
  setPlaylistId: (playlistId: null) => void
  register: UseFormRegister<UpdatePlaylistArgs>
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
  editPlaylist: (playlist: null) => void
}

export const EditPlaylistForm = ({ playlistId, setPlaylistId, handleSubmit, register, editPlaylist }: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (body) => {
    if (!playlistId) return

    updatePlaylist({
      playlistId,
      body,
    }).then(() => {
      setPlaylistId(null)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button type={'submit'}>save</button>
      <button type={'button'} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  )
}
