import { NextPageContext } from "next"
import { getSession} from "next-auth/react"
import useCurrentUser from "@/hooks/useCurrentUser";

import InfoModal from "@/components/InfoModal";
import Navbar from  "@/components/Navbar";
import Billboard from  "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  //check if the session already exists
  if(!session){
    return {
      redirect:{
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}

export default function Home() {

  const {data:movies =[]} = useMovieList();
  /*go to MoviecCard component to check why this feauture is
   not yet abailable
  */
  //const {data:favourites =[]} = useFavorites();
  const {isOpen, closeModal} = useInfoModal();

  return (
    <>
      <InfoModal  visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title='Trending now' data={movies}/>
        {/*<MovieList title='My List' data={favourites}/>*/}
      </div>
    </>
  )
}
