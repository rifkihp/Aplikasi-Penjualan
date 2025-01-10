<?php

namespace App\Models;

use CodeIgniter\Model;

class Ujian extends Model
{
	protected $DBGroup              = 'default';
	protected $table                = 'ujian';
	protected $primaryKey           = 'id';
	protected $useAutoIncrement     = true;
	protected $insertID             = 0;
	protected $returnType           = 'array';
	protected $useSoftDelete        = false;
	protected $protectFields        = true;
	protected $allowedFields        = ['id', 'nama', 'id_sekolah', 'id_kelas', 'id_mapel', 'id_guru', 'tanggal', 'jam', 'tanggal_jam', 'waktu', 'penjelasan', 'acak', 'aktif', 'date_create', 'user_create', 'date_update', 'user_update'];

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
