<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Kas extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Kas();

		$from_date = $this->request->getVar('from_date');
		$to_date   = $this->request->getVar('to_date');
		
		$session    = \Config\Services::session();
        $user_login = $session->get('user');

		$builder = $model->select('
			id, 
			kode,
			DATE_FORMAT(tanggal_jam, "%d.%m.%Y") tanggal,
			DATE_FORMAT(tanggal_jam, "%H:%i") jam,
			keterangan,
			jenis,
			jumlah,
			saldo
        ');

		$builder->where('DATE_FORMAT(tanggal_jam, "%Y-%m-%d") >=', $from_date);
		$builder->where('DATE_FORMAT(tanggal_jam, "%Y-%m-%d") <=', $to_date);
		$builder->orderBy('tanggal_jam', 'ASC');

		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		$saldo_awal = 0;
		if(count($data)>0) {
			$rec = $data[0];
			if($rec['jenis']=='MASUK') {
				$saldo_awal = $rec['saldo']-$rec['jumlah'];
			} else
			if($rec['jenis']=='KELUAR') {
				$saldo_awal = $rec['saldo']+$rec['jumlah'];
			}
		}

		$response = [
            'data'  => $data,
            'total' => count($data),
			'sawal' => $saldo_awal
        ];
            
		return $this->respond($response, 200);
	}
	
	
	public function insert() {

		$session    = \Config\Services::session();
        $user_login = $session->get('user');

		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'id_user'          => $user_login['id'], //$this->request->getPost('id_user'),
			'nomor_polisi'     => $this->request->getPost('nomor_polisi'),
			
			'nopol_kode_kota'      => $this->request->getPost('nopol_kode_kota'),
			'nopol_kode_kendaraan' => $this->request->getPost('nopol_kode_kendaraan'),
			'nopol_kode_wilayah'   => $this->request->getPost('nopol_kode_wilayah'),

            'domisili'         => $this->request->getPost('domisili'),
            'nama_pemohon'     => $this->request->getPost('nama_pemohon'),
            'waktu_permintaan' => $date->format('Y-m-d H:i:s'),
			'status'           => 0,

			'user_create'      => $user_login['id'],
			'date_create'      => $date->format('Y-m-d H:i:s'),
			'user_update'      => $user_login['id'],
			'date_update'      => $date->format('Y-m-d H:i:s')
		];

		$validation = \Config\Services::validation();
		if($validation->run($_DATA, 'permintaaninfo') == FALSE) {
            foreach($validation->getErrors() as $value) {
                $response = [                
                    'success' => false,
                    'message' => $value
                ];
    
                return $this->respond($response, 500);
            }
        }

		$model  = new \App\Models\Kas();

		//cek permintaan double
		$builder = $model->select('COUNT(*) TOTAL');
		$builder->where(['nomor_polisi' => $_DATA['nomor_polisi'], 'id_user' => $_DATA['id_user']]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Nomer Polisi sudah ada.'
			];

			return $this->respond($response, 500);
		}

		$insert = $model->insert($_DATA);
		if($insert) {
			$response = [
				'success' => true,
				'message' => 'Permintaan Cek Kendaraan berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Tambah data Operator gagal.'
			];

			return $this->respond($response, 500);
		}
	}

}
