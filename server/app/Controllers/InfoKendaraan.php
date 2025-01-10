<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class InfoKendaraan extends BaseController
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
			DATE_FORMAT(A.waktu_tayang_info_kendaraan, "%d-%m-%Y %H:%i") waktu_tayang,
			A.status_info_kendaraan status
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
			DATE_FORMAT(A.waktu_tayang_info_kendaraan, "%d-%m-%Y %H:%i") waktu_tayang,
			A.status_info_kendaraan status,
			
			A.nama_pemilik,
			A.alamat,
			A.kota_kabupaten,
			A.kd_jenis_kb,
			A.kd_merek_kb,
			A.kd_fungsi,
			A.type,
			A.tahun_pembuatan,
			A.nomor_bpkb,
			A.warna_kb,
			A.jumlah_cc,
			A.no_rangka,
			A.no_mesin,
			A.milik_ke,
			A.warna_plat,
			DATE_FORMAT(A.tanggal_akhir_pajak, "%d-%m-%Y") tanggal_akhir_pajak,
			DATE_FORMAT(A.tanggal_akhir_stnk, "%d-%m-%Y") tanggal_akhir_stnk,
			A.blokir_ktp,
			A.status_stnk,
			A.status_rubentina,
			A.bbnkb_pokok, 
			A.bbnkb_sanksi_administratif, 
			A.bbnkb_jumlah,
			A.pkb_pokok, 
			A.pkb_sanksi_administratif, 
			A.pkb_jumlah,
			A.sdwkllj_pokok, 
			A.sdwkllj_sanksi_administratif, 
			A.sdwkllj_jumlah,
			A.bea_stnk_pokok, 
			A.bea_stnk_sanksi_administratif, 
			A.bea_stnk_jumlah,
			A.bea_tnkb_pokok, 
			A.bea_tnkb_sanksi_administratif, 
			A.bea_tnkb_jumlah,
			A.jumlah_pokok, 
			A.jumlah_sanksi_administratif, 
			A.jumlah_total
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

			'nama_pemilik'    	  => $this->request->getPost('nama_pemilik'),
			'alamat'  		  	  => $this->request->getPost('alamat'),
			'kota_kabupaten'  	  => $this->request->getPost('kota_kabupaten'),
			'kd_jenis_kb'     	  => $this->request->getPost('kd_jenis_kb'),
			'kd_merek_kb'     	  => $this->request->getPost('kd_merek_kb'),
			'kd_fungsi'       	  => $this->request->getPost('kd_fungsi'),
            'type'            	  => $this->request->getPost('type'),
            'tahun_pembuatan' 	  => $this->request->getPost('tahun_pembuatan'),
            'nomor_bpkb'      	  => $this->request->getPost('nomor_bpkb'),
            'warna_kb'        	  => $this->request->getPost('warna_kb'),
            'jumlah_cc'       	  => $this->request->getPost('jumlah_cc'),
			'no_rangka'       	  => $this->request->getPost('no_rangka'),
			'no_mesin'            => $this->request->getPost('no_mesin'),
			'milik_ke'            => $this->request->getPost('milik_ke'),
			'warna_plat'          => $this->request->getPost('warna_plat'),
			'tanggal_akhir_pajak' => $this->request->getPost('tanggal_akhir_pajak'),
            'tanggal_akhir_stnk'  => $this->request->getPost('tanggal_akhir_stnk'),
			'blokir_ktp'          => $this->request->getPost('blokir_ktp'),
			'status_stnk'         => $this->request->getPost('status_stnk'),
			'status_rubentina'    => $this->request->getPost('status_rubentina'),

			'bbnkb_pokok'    				=> $this->request->getPost('bbnkb_pokok'),
			'bbnkb_sanksi_administratif'    => $this->request->getPost('bbnkb_sanksi_administratif'),
			'bbnkb_jumlah'    				=> $this->request->getPost('bbnkb_jumlah'),
			'pkb_pokok'    					=> $this->request->getPost('pkb_pokok'),
			'pkb_sanksi_administratif'    	=> $this->request->getPost('pkb_sanksi_administratif'),
			'pkb_jumlah'    				=> $this->request->getPost('pkb_jumlah'),
			'sdwkllj_pokok'    				=> $this->request->getPost('sdwkllj_pokok'), 
			'sdwkllj_sanksi_administratif'  => $this->request->getPost('sdwkllj_sanksi_administratif'), 
			'sdwkllj_jumlah'    			=> $this->request->getPost('sdwkllj_jumlah'),
			'bea_stnk_pokok'    			=> $this->request->getPost('bea_stnk_pokok'), 
			'bea_stnk_sanksi_administratif' => $this->request->getPost('bea_stnk_sanksi_administratif'), 
			'bea_stnk_jumlah'    			=> $this->request->getPost('bea_stnk_jumlah'),
			'bea_tnkb_pokok'    			=> $this->request->getPost('bea_tnkb_pokok'), 
			'bea_tnkb_sanksi_administratif' => $this->request->getPost('bea_tnkb_sanksi_administratif'), 
			'bea_tnkb_jumlah'    			=> $this->request->getPost('bea_tnkb_jumlah'),
			'jumlah_pokok'    				=> $this->request->getPost('jumlah_pokok'), 
			'jumlah_sanksi_administratif'   => $this->request->getPost('jumlah_sanksi_administratif'), 
			'jumlah_total'    				=> $this->request->getPost('jumlah_total'),
			'user_update'         		    => $user_login['id'],
			'date_update'         			=> $date->format('Y-m-d H:i:s')
		];

		//PROSES UPDATE INFO KENDARAAN
		$model = new \App\Models\InfoKendaraan();
		$model->where(['id' => $id])->set($_DATA)->update();

		$response = [
			'success' => true,
			'message' => 'Update Info Kendaraan berhasil.'
		];

		return $this->respond($response, 200);
	}

	public function tayang($id) {
		$model  = new \App\Models\InfoKendaraan();
		$status = $this->request->getPost('status');

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'status_info_kendaraan'       => $status,
			'waktu_tayang_info_kendaraan' => $status==1?$date->format('Y-m-d H:i:s'):NULL
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success'      => true,
				'message'      => 'Perubahan status tayang berhasil.',
				'waktu_tayang' => ''
			];

			if($status==1) {
				$builder = $model->select('DATE_FORMAT(waktu_tayang_info_kendaraan, "%d-%m-%Y %H:%i") waktu_tayang');
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
