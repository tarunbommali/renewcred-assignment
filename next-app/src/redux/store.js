import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// --- AUTH SLICE ---
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, admin } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('renewcred_admin_token', token);
        localStorage.setItem('renewcred_admin_user', JSON.stringify(admin));
      }
      return { token, admin };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

const getInitialToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('renewcred_admin_token') || null;
  }
  return null;
};

const getInitialAdmin = () => {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem('renewcred_admin_user') || 'null');
    } catch {
      return null;
    }
  }
  return null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getInitialToken(),
    admin: getInitialAdmin(),
    isAuthenticated: !!getInitialToken(),
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('renewcred_admin_token');
        localStorage.removeItem('renewcred_admin_user');
      }
      state.token = null;
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// --- CONTENT SLICE ---
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/content`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch content');
    }
  }
);

export const updateSection = createAsyncThunk(
  'content/updateSection',
  async ({ sectionKey, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || (typeof window !== 'undefined' ? localStorage.getItem('renewcred_admin_token') : null);
      const response = await axios.put(`${API_URL}/content/${sectionKey}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { sectionKey, data: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || `Failed to update ${sectionKey}`);
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    sections: {},
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        const mapped = {};
        if (Array.isArray(action.payload)) {
          action.payload.forEach(item => {
            mapped[item.sectionKey] = item;
          });
        }
        state.sections = mapped;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.sections[action.payload.sectionKey] = action.payload.data;
      });
  }
});

export const { logout, clearError } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    content: contentSlice.reducer
  }
});
