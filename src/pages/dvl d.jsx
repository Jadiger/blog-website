const uploadFiles = (files) => {
        const promises = []
        files.map((file) => {
            console.log('loop');

            const sotrageRef = ref(storage, `files/${file.name}`);

            const uploadTask = uploadBytesResumable(sotrageRef, file);
            promises.push(uploadTask)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(prog);
                },
                (error) => console.log(error),
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                        setURLs(prevState => [...prevState, downloadURLs])
                        console.log("File available at", downloadURLs);
                    });
                }
            );


        })
        Promise.all(promises)
            .then(() => alert('All images uploaded'))
            .then(err => console.log(err))

    };

    console.log(selectedImages);
    console.log(URLs);
    const handleSubmit = () => { uploadFiles(images); }