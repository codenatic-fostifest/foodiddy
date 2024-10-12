import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const usePostsProfile = (userId? : string) => {
  const [posts, setPosts] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  const getProfileList = async () => {
    if (userId) {
        setLoading(true);
        try {
            let { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('user_id', userId)
            if (error) throw new Error(error.message)
            setPosts(data)
        } catch (error : any) {
          Alert.alert('Error', error.message);
        } finally {
          setLoading(false);
        }
    }
  };

  useEffect(() => {
    getProfileList();
  }, []);

  return { posts, isLoading, getProfileList };
};

export default usePostsProfile;