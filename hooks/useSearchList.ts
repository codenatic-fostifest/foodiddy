import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useSearchPosts = (title : string) => {
  const [posts, setPosts] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  const getSearchList = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase.from('posts').select('*').ilike('title', `%${title}%`);
      if (error) throw new Error(error.message);
      setPosts(data);
    } catch (error : any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchList();
  }, []);

  return { posts, isLoading, getSearchList };
};

export default useSearchPosts;