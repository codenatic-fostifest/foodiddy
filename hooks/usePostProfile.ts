import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const usePostsProfile = (userId?: string) => {
  const [posts, setPosts] = useState<any[]|undefined>([]);
  const [totalLikes, setTotalLikes] = useState<number>(0); // State untuk total likes
  const [isLoading, setLoading] = useState(false);

  const getProfileList = async () => {
    if (userId) {
      setLoading(true);
      try {
        // Ambil semua postingan dari pengguna
        let { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', userId);

        if (postsError) throw new Error(postsError.message);

        // Ambil semua likes
        let { data: likesData, error: likesError } = await supabase
          .from('likes')
          .select('*');

        if (likesError) throw new Error(likesError.message);

        // Hitung total likes untuk setiap postingan
        const postsWithLikes = postsData?.map(post => {
          const postLikes = likesData?.filter(like => like.post_id === post.id);
          const totalLikesForPost = postLikes?.length || 0; // Total likes untuk postingan ini

          return {
            ...post,
            totalLikes: totalLikesForPost,
          };
        });

        // Hitung total likes dari semua postingan
        const allLikes = postsWithLikes?.reduce((acc, post) => acc + post.totalLikes, 0) || 0;

        setPosts(postsWithLikes);
        setTotalLikes(allLikes); // Set total likes dari semua postingan
      } catch (error: any) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProfileList();
  }, [userId]); // Tambahkan userId sebagai dependency

  return { posts, totalLikes, isLoading, getProfileList }; // Kembalikan totalLikes
};

export default usePostsProfile;
