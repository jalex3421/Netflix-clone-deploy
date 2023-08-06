import { NextApiRequest,NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

//this module is going to handle the operations related to favourite movies/series

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try{
        //1)Add a favourite element
        if(req.method =='POST'){
            const {currentUser} = await serverAuth(req);

            const {movieId} = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where:{
                    id: movieId,
                }
            })

            if(!existingMovie){throw new Error('Movie not found')};

            //if the movieId exists, we should the id to the Users favourite list
            const user = await prismadb.user.update({
                //select the condition to make the update
                where:{
                    email: currentUser.email|| '',
                }, //provide the actual data to update
                data: {
                    favoriteIds:{
                        push:movieId,
                    }
                }
            })
        }
        //2)Remove a favourite element
        if(req.method === 'DELETE'){
            const {currentUser} = await serverAuth(req);

            const {movieId} = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where:{
                    id: movieId,
                }
            })

            if(!existingMovie){throw new Error('Movie not found')};

            //get current list of favourite movie and delete the selected one: WITHOUT
            const updateFavoriteIds = without(currentUser.favoriteIds,movieId);

            const updatedUser = await prismadb.user.update({
                //select the condition to make the update
                where:{
                    email: currentUser.email|| '',
                }, //provide the actual data to update
                data: {
                    favoriteIds:updateFavoriteIds,
                }
            });
            return res.status(200).json(updatedUser);

            //in the case there is another operation, just respond another status
            return res.status(405).end();
        }
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}