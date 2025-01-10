<?php

namespace App\Models;

use CodeIgniter\Model;

class InfoKendaraan extends Model
{
	protected $DBGroup              = 'default';
	protected $table                = 'info_kendaraan';
	protected $primaryKey           = 'id';
	protected $useAutoIncrement     = true;
	protected $insertID             = 0;
	protected $returnType           = 'array';
	protected $useSoftDelete        = false;
	protected $protectFields        = true;
	protected $allowedFields        = ['id', 'id_user', 'nomor_polisi', 'nopol_kode_kota', 'nopol_kode_kendaraan', 'nopol_kode_wilayah', 
									   'domisili', 'nama_pemohon', 'waktu_permintaan',
									   'status_info_kendaraan', 'status_info_etle', 'waktu_tayang_info_kendaraan', 'waktu_tayang_info_etle',
									 
									   'nama_pemilik', 'alamat', 'kota_kabupaten', 
									   'kd_jenis_kb', 'kd_merek_kb', 'kd_fungsi', 'type', 'tahun_pembuatan', 'nomor_bpkb', 'warna_kb', 
									   'jumlah_cc', 'no_rangka', 'no_mesin', 'milik_ke', 'warna_plat', 'tanggal_akhir_pajak', 
									   'tanggal_akhir_stnk', 'blokir_ktp', 'status_stnk', 'status_rubentina', 
									   
									   'bbnkb_pokok', 'bbnkb_sanksi_administratif', 'bbnkb_jumlah',
									   'pkb_pokok', 'pkb_sanksi_administratif', 'pkb_jumlah',
									   'sdwkllj_pokok', 'sdwkllj_sanksi_administratif', 'sdwkllj_jumlah',
									   'bea_stnk_pokok', 'bea_stnk_sanksi_administratif', 'bea_stnk_jumlah',
									   'bea_tnkb_pokok', 'bea_tnkb_sanksi_administratif', 'bea_tnkb_jumlah',
									   'jumlah_pokok', 'jumlah_sanksi_administratif', 'jumlah_total',

									   'etle_tangkap_layar_1',
									   'etle_tangkap_layar_2',
									   'etle_tangkap_layar_3',
									   'etle_tangkap_layar_4',
									   'etle_tangkap_layar_5',
									   'etle_tangkap_layar_6',

									   'date_create', 
									   'user_create', 
									   'date_update', 
									   'user_update'];

	// Dates
	protected $useTimestamps        = false;
	protected $dateFormat           = 'datetime';
	protected $createdField         = 'created_at';
	protected $updatedField         = 'updated_at';
	protected $deletedField         = 'deleted_at';

	// Validation
	protected $validationRules      = [];
	protected $validationMessages   = [];
	protected $skipValidation       = false;
	protected $cleanValidationRules = true;

	// Callbacks
	protected $allowCallbacks       = true;
	protected $beforeInsert         = [];
	protected $afterInsert          = [];
	protected $beforeUpdate         = [];
	protected $afterUpdate          = [];
	protected $beforeFind           = [];
	protected $afterFind            = [];
	protected $beforeDelete         = [];
	protected $afterDelete          = [];
}
