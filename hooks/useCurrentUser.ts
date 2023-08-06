//similar REACT QUERY. Manage queries. If the queries have been done
// the system does not need to check wheter the information has been \
//already submitted or no 
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    const { data,error,isLoading,mutate} = useSWR('/api/current',fetcher)

    return {
        data,
        error,
        isLoading,
         mutate
    }
};

export default useCurrentUser;