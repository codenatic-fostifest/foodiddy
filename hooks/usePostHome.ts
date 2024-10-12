import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const usePosts = () => {
  const [posts, setPosts] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  const getHomeList = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase.from('posts').select('*');
      if (error) throw new Error(error.message);
      setPosts(data);
    } catch (error : any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHomeList();
  }, []);

  return { posts, isLoading, getHomeList };
};

export default usePosts;
