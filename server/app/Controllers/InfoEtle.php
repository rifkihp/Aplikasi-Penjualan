<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class InfoEtle extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\InfoKendaraan();

		$page  = $this->request->getVar('page');
		$start = $this->request->getVar('start');
		$limit = $this->request->getVar('limit');

		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(A.nomor_polisi LIKE \'%'.$query.'%\' OR A.nama_pemohon LIKE \'%'.$query.'%\' OR A.domisili LIKE \'%'.$query.'%\')';
		}

		$builder = $model->db->table('info_kendaraan A');
		$builder->select('
			A.id, 
			A.nomor_polisi,
			A.domisili,
			A.nama_pemohon,
			DATE_FORMAT(A.waktu_permintaan, "%d-%m-%Y %H:%i") waktu_permintaan,
			DATE_FORMAT(A.waktu_tayang_info_etle, "%d-%m-%Y %H:%i") waktu_tayang,
			A.status_info_etle status
        ');

		$builder->limit($limit, $start);
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('A.id', 'ASC');
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();

		$builder->select('COUNT(*) total'); 
		if($query!='') {
			$builder->where($query);
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
		$model = new \App\Models\InfoKendaraan();

		$builder = $model->db->table('info_kendaraan A');
		$builder->select('
			A.id, 

			A.nomor_polisi,
			A.nopol_kode_kota,
			A.nopol_kode_kendaraan,
			A.nopol_kode_wilayah,
			A.domisili,
			A.nama_pemohon,
			DATE_FORMAT(A.waktu_permintaan, "%d-%m-%Y %H:%i") waktu_permintaan,
			DATE_FORMAT(A.waktu_tayang_info_etle, "%d-%m-%Y %H:%i") waktu_tayang,
			A.status_info_etle status,
		
			A.etle_tangkap_layar_1,
			A.etle_tangkap_layar_2,
			A.etle_tangkap_layar_3,
			A.etle_tangkap_layar_4,
			A.etle_tangkap_layar_5,
			A.etle_tangkap_layar_6
        ');
		$builder->where('A.id', $id);

		$data  =  $builder->get()->getRowArray();
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


	public function update($id) {

		$session = \Config\Services::session();
        $user_login = $session->get('user');

		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'etle_tangkap_layar_1' => $this->request->getPost('tangkap_layar_1'),
			'etle_tangkap_layar_2' => $this->request->getPost('tangkap_layar_2'),
			'etle_tangkap_layar_3' => $this->request->getPost('tangkap_layar_3'),
			'etle_tangkap_layar_4' => $this->request->getPost('tangkap_layar_4'),
			'etle_tangkap_layar_5' => $this->request->getPost('tangkap_layar_5'),
			'etle_tangkap_layar_6' => $this->request->getPost('tangkap_layar_6'),
			'user_update'          => $user_login['id'],
			'date_update'          => $date->format('Y-m-d H:i:s')
		];

		//PROSES UPDATE INFO KENDARAAN
		$model = new \App\Models\InfoKendaraan();
		$model->where(['id' => $id])->set($_DATA)->update();

		$response = [
			'success' => true,
			'message' => 'Update Info Etle berhasil.'
		];

		return $this->respond($response, 200);
	}

	public function tayang($id) {
		$model  = new \App\Models\InfoKendaraan();
		$status = $this->request->getPost('status');

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'status_info_etle'       => $status,
			'waktu_tayang_info_etle' => $status==1?$date->format('Y-m-d H:i:s'):NULL
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success'      => true,
				'message'      => 'Perubahan status tayang berhasil.',
				'waktu_tayang' => ''
			];

			if($status==1) {
				$builder = $model->select('DATE_FORMAT(waktu_tayang_info_etle, "%d-%m-%Y %H:%i") waktu_tayang');
				$builder->where('id', $id);
				$data = $builder->get()->getRowArray();
				$response['waktu_tayang'] = $data['waktu_tayang'];
			}

			return $this->respond($response, 200);
		} else {
			$response = [
				'error' => true,
				'message' => 'Proses perubahan status tayang gagal.'
			];

			return $this->respond($response, 500);
		}
	}

}
