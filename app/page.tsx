import React from 'react';

import FileUploadForm from './components/FileUploadForm';

const HomePage = () => {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			 <FileUploadForm />
		</main>
	);
};

export default HomePage;
