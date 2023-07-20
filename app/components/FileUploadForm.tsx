'use client';

import React, { FormEvent, useState } from 'react';
import CustomFileSelector from './CustomFileSelector';
import ImagePreview from './ImagePreview';

const FileUploadForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageItems, setImageItems] = useState<string[]>([])
	const [uploading, setUploading] = useState(false);

	const handleFileSelected = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (e.target.files) {
			const _files = Array.from(e.target.files);
			setImages(_files);
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const folderName = 'images';

		const formData = new FormData();
		const imageArray: string[] = [];
		images.forEach(image => {
			formData.append(`${folderName}/${image.name}`, image);
			imageArray.push(`/${folderName}/${image.name}`);
		});
		setUploading(true);

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			if (res.ok) {
				const fileObjects = imageArray.map(url => {
					const fileName = url.substring(url.lastIndexOf('/') + 1);
					const file = new File([], fileName);
					return Object.assign(file, { path: url });
				});

        // setImages(fileObjects);
        setImageItems(imageArray)
			}

			if (!res.ok) {
				throw new Error('Something went wrong.');
			}
		} catch (error) {
			console.error(
				'Something went wrong, check your console.',
				error
			);
		}

		setUploading(false);
  };


	return (
		<form className='w-full' onSubmit={handleSubmit}>
			<div className='flex justify-between'>
				<CustomFileSelector
					accept='image/*'
					onChange={handleFileSelected}
				/>
				<button
					type='submit'
					className={`${'bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md'} ${
						uploading ? 'disabled pointer-events-none opacity-40' : ''
					}`}
					disabled={uploading}
				>
					Upload
				</button>
			</div>
			<ImagePreview images={images} />
		</form>
	);
};

export default FileUploadForm;
