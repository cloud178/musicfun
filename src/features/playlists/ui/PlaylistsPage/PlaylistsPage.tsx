import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import s from './PlaylistsPage.module.css'
import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx'
import { useForm } from 'react-hook-form'
import type { PlaylistData, UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { useState } from 'react'
import { PlaylistItem } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem.tsx'
import { EditPlaylistForm } from '@/features/playlists/ui/PlaylistsPage/editPlaylistForm/EditPlaylistForm.tsx'

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

  const { data } = useFetchPlaylistsQuery()
  const [deletePlaylist] = useDeletePlaylistMutation()

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((tag) => tag.id),
      })
    } else {
      setPlaylistId(null)
    }
  }

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylist(playlistId)
    }
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((playlist) => {
          const isEditing = playlistId === playlist.id

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing ? (
                <EditPlaylistForm
                  playlistId={playlistId}
                  setPlaylistId={setPlaylistId}
                  handleSubmit={handleSubmit}
                  register={register}
                  editPlaylist={editPlaylistHandler}
                />
              ) : (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylistHandler={deletePlaylistHandler}
                  editPlaylistHandler={editPlaylistHandler}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
