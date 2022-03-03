import { useState } from 'react';
import './upload.css';
import { Button, Form, Image, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

function Upload() {

  const UPLOAD_API_URL = 'http://localhost:3001/upload';

  const [image, setImage] = useState();
  const [disableButton, setDisableButton] = useState(true);
  const [urlImage, setUrlImage] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  async function handleUpload(event) {
    event.preventDefault();
    try {
      setShowLoading(true);
      setDisableButton(true);
      const formData = new FormData()
      formData.append('image', image);
      const { data } = await axios.post(UPLOAD_API_URL, formData);
      setUrlImage(data.path);
      setShowImage(true);
    } catch(err) {
      setShowLoading(false);
      setShowModal(true);
    }
    setShowLoading(false);
    setDisableButton(false);
  }

  function handleImage(event) {
    setImage(event.target.files[0]);
    setDisableButton(false);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div>
        <h3 className='text-center'>Upload de Imagens</h3>
        <div className='jumbotron'>
          <Form onSubmit={handleUpload} noValidate>
            <Form.Group>
              <Form.Label>Selecione a imagem (PNG ou JPEG)</Form.Label>
              <Form.Control
                type='file'
                onChange={handleImage}
                accept='image/png, image/jpeg' />
            </Form.Group>
            <Form.Group className='text-center'>
              <Button
                variant='success'
                type='submit'
                disabled={disableButton}>
                  <span> Fazer upload </span>
              </Button>
            </Form.Group>
            <Form.Group className={showLoading ? 'text-center' : 'hidden'}>
              <Spinner animation='border' />
            </Form.Group>
          </Form>
          <div className={showImage ? 'text-center' : 'hidden'}>
            <hr />
            <a href={urlImage} target='_blank' rel='noopener noreferrer'>
              <Image src={urlImage} thumbnail />
              <br/>
              {urlImage}
            </a>
          </div>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Erro ao fazer upload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Não foi possível fazer o upload da imagem. Tente novamente.
          </Modal.Body>
          <Modal.Footer>
            <Button variant='warning' onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

    </div>
  );
}

export default Upload;
