export const fileUpload = async (file) => {

    if (!file) throw new Error('File is required');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/cursos-harol/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });

        if (resp.ok) {
            const cloudResp = await resp.json();
            // console.log(cloudResp);
            return cloudResp.secure_url;
        } else {
            const respJson = await resp.json();
            // console.log('Error al subir la imagen', respJson);
            throw await respJson;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}