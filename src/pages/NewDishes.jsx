import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../firebase';
import { useNavigate } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';

const NewDishes = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      image: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      price: Yup.number()
        .required('El Precio es obligatorio')
        .min(1, 'Debes agregar un valor'),
      category: Yup.string().required('La categoria es obligatoria'),
      description: Yup.string()
        .required('La descripcion es obligatoria')
        .min(10, 'la descripcion debe ser mas larga'),
    }),
    onSubmit: (datos) => {
      try {
        datos.existencia = true;
        datos.image = imageUrl;
        firebase.db.collection('productos').add(datos);
        navigate('/menu');
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleUploadStart = () => {
    setProgress(0);
    setUploadImage(true);
  };

  const handleUploadError = (error) => {
    setUploadImage(false);
    console.log(error);
  };

  const handleUploadSuccess = async (name) => {
    setProgress(100);
    setUploadImage(false);

    const url = await firebase.storage
      .ref('productos')
      .child(name)
      .getDownloadURL();
    setImageUrl(url);
  };

  const handleProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Agregar orden</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                id="name"
                placeholder="Nombre del plato"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mb-2 shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.name && formik.errors.name && (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mt-2 mb-2"
                  role="alert"
                >
                  <p>{formik.errors.name}</p>
                </div>
              )}
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Precio
              </label>
              <input
                id="price"
                placeholder="precio del plato"
                type="number"
                min="0"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mb-2 shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.price && formik.errors.price && (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mt-2 mb-2"
                  role="alert"
                >
                  <p>{formik.errors.price}</p>
                </div>
              )}
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Categoria
              </label>
              <select
                className="mb-2 shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Seleccione</option>
                <option value="desayuno">desayuno</option>
                <option value="almuerzo">Almuerzo</option>
                <option value="cena">Cena</option>
                <option value="Bebidas">Bebidas</option>
                <option value="postre">Postre</option>
                <option value="ensalada">Ensalada</option>
              </select>
              {formik.touched.category && formik.errors.category && (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mt-2 mb-2"
                  role="alert"
                >
                  <p>{formik.errors.category}</p>
                </div>
              )}
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Imagen
              </label>
              <FileUploader
                accept="image/*"
                id="image"
                name="image"
                randomizeFilename
                storageRef={firebase.storage.ref('productos')}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
              {uploadImage && (
                <div className="h-12 relative w-full border">
                  <div
                    className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 items-center"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}
                  </div>
                </div>
              )}
              {imageUrl && (
                <p className="bg-green-500 text-white p-3 text-center my-5">
                  Se subio imagen correctamente
                </p>
              )}
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Descripcion
              </label>
              <textarea
                id="description"
                placeholder="Descripcion del plato"
                type="text"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-40 mb-2 shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.description && formik.errors.description && (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mt-2 mb-2"
                  role="alert"
                >
                  <p>{formik.errors.description}</p>
                </div>
              )}
              <input
                type="submit"
                id="description"
                value="Agregar plato"
                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewDishes;
