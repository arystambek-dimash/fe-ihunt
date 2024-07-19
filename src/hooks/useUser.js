import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useNavigate} from 'react-router-dom';
import api from "../services/api";

const fetchProfile = async () => {
    const {data} = await api.get('/users/profile');
    console.log(data)
    return data;
};

const updateProfile = async (profileData) => {
    const {data} = await api.put('/users/profile', profileData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
};

export const useUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {data, error, isLoading} = useQuery('userProfile', fetchProfile, {
        onError: (err) => {
            if (err.response && err.response.status === 401) {
                console.log('Unauthorized, redirecting to login...');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate('/login');
            }
        }
    });

    const mutation = useMutation(updateProfile, {
        onSuccess: () => {
            queryClient.invalidateQueries('userProfile');
        }
    });

    return {
        user: data ? data.user : null,
        error,
        isLoading,
        updateProfile: mutation.mutate
    };
};
