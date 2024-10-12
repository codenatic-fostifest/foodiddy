import { GlobalContextType, useGlobalContext } from '@/context/global-provider';
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const usePosts = () => {
  const { user } = useGlobalContext() as GlobalContextType
  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);

  const getHomeList = async () => {
    setLoading(true);
    try {
      // Ambil semua postingan
      let { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw new Error(postsError.message);

      // Ambil semua likes
      let { data: likesData, error: likesError } = await supabase
        .from('likes')
        .select('*');

      if (likesError) throw new Error(likesError.message);

      // Tambahkan total likes ke setiap postingan
      const postsWithLikes = postsData?.map(post => {
        const postLikes = likesData?.filter(like => like.post_id === post.id);

        const hasUserLiked = postLikes?.some(like => like.user_id === user?.sub);
        
        return {
          ...post,
          totalLikes: postLikes?.length || 0, 
          hasLiked: hasUserLiked, 
        };
      });

      setPosts(postsWithLikes);
    } catch (error: any) {
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

