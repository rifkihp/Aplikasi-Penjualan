<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Quiz extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Quiz();

		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');

		$nama     = $this->request->getVar('nama');
		$kelas    = $this->request->getVar('kelas');

		$builder = $model->db->table('quiz A');
		$builder->select('
			A.id,
			A.judul,

			soal,
			audiofile,
			docfile,
			
			B.nama kelas,
			C.nama mapel,
			D.nama guru,

			DATE_FORMAT(A.tanggal_mulai, \'%d-%m-%Y\') mulai,
			DATE_FORMAT(A.tanggal_selesai, \'%d-%m-%Y\') selesai,
			
			A.aktif
		');
		$builder->limit($limit, $start);
		$builder->join('kelas B', 'B.id=A.id_kelas', 'LEFT');
		$builder->join('mapel C', 'C.id=A.id_mapel', 'LEFT');
		$builder->join('guru D', 'D.id=A.id_guru', 'LEFT');
		
		$builder->where('A.id_sekolah', 1);
		if($nama!='') {
			$builder->where('A.nama', $nama);
		}
		if($kelas>0) {
			$builder->where('A.id_kelas', $kelas);
		}
		$builder->orderBy('A.id', 'ASC');
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		
		//TOTAL
		$builder->select('COUNT(*) total'); 
		$builder->where('A.id_sekolah', 1);
		if($nama!='') {
			$builder->where('A.nama', $nama);
		}
		if($kelas>0) {
			$builder->where('A.id_kelas', $kelas);
		}
		//$total = $builder->getCompiledSelect();
		$total = $builder->get()->getRowArray();
		$total = $total['total'];

		$response = [
            'data' => $data,
            'total' => $total
        ];
            
		return $this->respond($response, 200);

	}
	
	public function load($id) {
		$model = new \App\Models\Quiz();

		$data  = $model->select('
			id,
			judul,

			soal,
			audiofile,
			docfile,

			id_kelas kelas,
			id_mapel mapel,
			id_guru guru,

			DATE_FORMAT(tanggal_mulai, \'%d-%m-%Y\') tanggal_mulai,
			DATE_FORMAT(tanggal_selesai, \'%d-%m-%Y\') tanggal_selesai
		
		')->where('id', $id)->first();
		if($data) {
			$response = [
				'success' => true,
        		'data' => $data
			];

			return $this->respond($response, 200);	
		} else {
			$response = [
				'success' => false,
        		'message' => 'Data tidak ditemukan.'
			];

			return $this->respond($response, 500);
		}
    }

	public function delete($id) {
		$model  = new \App\Models\Quiz();
		
		$data = $model->select('
			audiofile,
			docfile
		')		
		->whereIn('id', explode(',', $id))->get()->getResultArray();

		foreach($data as $_DATA) {
			if($_DATA['audiofile']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['audiofile']);			
			}
			if($_DATA['docfile']!='' && file_exists(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile'])) {
				unlink(ROOTPATH . 'public/uploads/berkas/'.$_DATA['docfile']);			
			}
		}

		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$model->db->table('quiz_to_ruang')->whereIn('id_quiz', explode(',', $id))->delete();
			$response = [
				'success' => true,
				'message' => 'Hapus data Quiz berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus data Quiz gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model  = new \App\Models\Quiz();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'judul'           => $this->request->getPost('judul'),
            
			'id_sekolah'      => 1,
			'id_kelas'        => $this->request->getPost('kelas'),
			'id_mapel'        => $this->request->getPost('mapel'),
			'id_guru'         => $this->request->getPost('guru'),

            'tanggal_mulai'   => $this->request->getPost('tanggal_mulai'),
            'tanggal_selesai' => $this->request->getPost('tanggal_selesai'),
            
			'soal'            => $this->request->getPost('soal'),
			'audiofile'       => $this->request->getPost('audiofile'),
			'docfile'         => $this->request->getPost('docfile'),
            'aktif'           => $this->request->getPost('aktif'),

			'date_create' => $date->format('Y-m-d H:i:s'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$insert = $model->insert($_DATA);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Tambah data Quiz berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Quiz gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function update($id) {
		$model  = new \App\Models\Quiz();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'judul'           => $this->request->getPost('judul'),
            
			'id_sekolah'      => 1,
			'id_kelas'        => $this->request->getPost('kelas'),
			'id_mapel'        => $this->request->getPost('mapel'),
			'id_guru'         => $this->request->getPost('guru'),

            'tanggal_mulai'   => $this->request->getPost('tanggal_mulai'),
            'tanggal_selesai' => $this->request->getPost('tanggal_selesai'),
            
			'soal'            => $this->request->getPost('soal'),
			'audiofile'       => $this->request->getPost('audiofile'),
			'docfile'         => $this->request->getPost('docfile'),
            'aktif'           => $this->request->getPost('aktif'),
			
			'date_create'     => $date->format('Y-m-d H:i:s'),
			'date_update'     => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Quiz berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Quiz gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function aktif($id) {
		$model  = new \App\Models\Quiz();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'aktif'        => $this->request->getPost('status'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Quiz berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Update Quiz gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
