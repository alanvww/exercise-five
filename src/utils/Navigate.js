import { Navigate, useNavigate } from 'react-router';

export default (to) => {
	const navigate = useNavigate();
	return navigate(to);
};
