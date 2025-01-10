<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class CekInfoKendaraan extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\InfoKendaraan();

		$page  = $this->request->getVar('page');
		$start = $this->request->getVar('start');
		$limit = $this->request->getVar('limit');

		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(nomor_polisi LIKE \'%'.$query.'%\' OR nama_pemohon LIKE \'%'.$query.'%\' OR domisili LIKE \'%'.$query.'%\')';
		}

		$session    = \Config\Services::session();
        $user_login = $session->get('user');


		$builder = $model->select('
			id, 
			nomor_polisi,
			nopol_kode_kota,
			nopol_kode_kendaraan,
			nopol_kode_wilayah,
			domisili,
			nama_pemohon,

			DATE_FORMAT(waktu_permintaan, "%d-%m-%Y %H:%i:%s") waktu_permintaan,
			status_info_kendaraan,
			status_info_etle,
			DATE_FORMAT(waktu_tayang_info_kendaraan, "%d-%m-%Y %H:%i:%s") waktu_tayang_info_kendaraan,
			DATE_FORMAT(waktu_tayang_info_etle, "%d-%m-%Y %H:%i:%s") waktu_tayang_info_etle,
			
			nama_pemilik,
			alamat,
			kota_kabupaten,
			kd_jenis_kb,
			kd_merek_kb,
			kd_fungsi,
			type,
			tahun_pembuatan,
			nomor_bpkb,
			warna_kb,
			jumlah_cc,
			no_rangka,
			no_mesin,
			milik_ke,
			warna_plat,
			DATE_FORMAT(tanggal_akhir_pajak, "%d-%m-%Y") tanggal_akhir_pajak,
			DATE_FORMAT(tanggal_akhir_stnk, "%d-%m-%Y") tanggal_akhir_stnk,
			blokir_ktp,
			status_stnk,
			status_rubentina,
			bbnkb_pokok, 
			bbnkb_sanksi_administratif, 
			bbnkb_jumlah,
			pkb_pokok, 
			pkb_sanksi_administratif, 
			pkb_jumlah,
			sdwkllj_pokok, 
			sdwkllj_sanksi_administratif, 
			sdwkllj_jumlah,
			bea_stnk_pokok, 
			bea_stnk_sanksi_administratif, 
			bea_stnk_jumlah,
			bea_tnkb_pokok, 
			bea_tnkb_sanksi_administratif, 
			bea_tnkb_jumlah,
			jumlah_pokok, 
			jumlah_sanksi_administratif, 
			jumlah_total,

			etle_tangkap_layar_1,
			etle_tangkap_layar_2,
			etle_tangkap_layar_3,
			etle_tangkap_layar_4,
			etle_tangkap_layar_5,
			etle_tangkap_layar_6
        ');

		$builder->limit($limit, $start);
		$builder->where('id_user', $user_login['id']);
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('id', 'ASC');
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();

		$builder->select('COUNT(*) total');
		$builder->where('id_user', $user_login['id']);
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

		$model  = new \App\Models\InfoKendaraan();

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
