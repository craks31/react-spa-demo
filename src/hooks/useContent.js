import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Read from environment variables.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export function useContent() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getArticles() {
      const { data, error } = await supabase.from("articles").select();
      if (error) throw error; // Throw error so Promise.all can catch it
      
      // Supabase returns an array. Since App.jsx expects a single article object (article.title),
      // we take the first item from the array.
      setArticle(data && data.length > 0 ? data[0] : null);
    }

    async function getComments() {
      const { data, error } = await supabase.from("comments").select();
      if (error) throw error;
      
      setComments(data || []);
    }


    // Promise.all lets us run both asynchronous functions concurrently
    Promise.all([
      getArticles(),
      getComments()
    ])
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Supabase fetch error:", err);
        setError("Could not load data from Supabase.");
        setIsLoading(false);
      });
  }, []);

  return { article, comments, isLoading, error };
}
