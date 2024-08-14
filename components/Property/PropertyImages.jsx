'use client';
import { useEffect } from 'react'

export default function PropertyImages({ images }) {
    useEffect(() => {
        console.log(images);
    }, [])

  return (
    <section>Images</section>
  )
}
