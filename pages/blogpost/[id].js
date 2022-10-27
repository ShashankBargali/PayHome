import { useRouter } from 'next/router'
import Image from 'next/image';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <p>{id} of class </p>
    </>
  )
}

export default Post