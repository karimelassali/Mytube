import create from "zustand";
import axios from "axios";

interface Props {
  data: [];
  category: string;
  isLoading: boolean;
  error: string | null;
  singleData: null;
  comments: [];

  fetchData: (category?: string) => Promise<void>;
  fetchSingleData: (id: string) => Promise<void>;
  setCategory: (newCategory: string) => void;
  fetchRelatedData: (id: string) => Promise<void>;
  fetchComments: (id: string) => Promise<void>;
  fetchSearchData: (value: string) => Promise<void>;
}

const options = {
  params: {
    maxResults: "100",
  },
  headers: {
    "x-rapidapi-key": "124026653fmsh089b9d0a0f2e111p129832jsnbea1e6651dd7",
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
  },
};

const useStore = create<Props>((set) => ({
  data: [],
  singleData: null,
  category: "New",
  isLoading: false,
  error: null,
  comments: [],

  fetchData: async (category?: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${category}`,
        options
      );
      set({ data: response.data.items, category, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  setCategory: (newCategory: string) => {
    set((state) => {
      if (state.category !== newCategory) {
        state.fetchData(newCategory);
      }
      return { category: newCategory };
    });
  },

  fetchSingleData: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `https://youtube-v31.p.rapidapi.com/videos?part=snippet,statistics&id=${id}`,
        options
      );
      set({ singleData: response.data.items[0], isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  fetchRelatedData: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `https://youtube-v31.p.rapidapi.com/search?part=snippet&relatedToVideoId=${id}&type=video`,
        options
      );
      set({ data: response.data.items, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  fetchComments: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${id}&maxResults=100`,
        options
      );
      set({ comments: response.data.items, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  fetchSearchData: async (value: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${value}`,
        options
      );
      set({ data: response.data.items, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  }
}));

export default useStore;
