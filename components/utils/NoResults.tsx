import React from 'react';
import { Alert } from '@mui/material';

interface IProps {
	text: string;
}
const NoResults = ({ text }: IProps) => {
	return <Alert severity="info">{text}</Alert>;
};

export default NoResults;
