export const SortType = {
	ASC: 'asc',
	DESC: 'desc',
	STATUS: 'status',
	CREATED_AT: 'created_at',
	UPDATED_AT: 'updated_at',
};

export const SortOptions = [
	{
		label: 'Name A-Z',
		value: SortType.ASC,
	},
	{
		label: 'Name Z-A',
		value: SortType.DESC,
	},
	{
		label: 'Status',
		value: SortType.STATUS,
	},
	{
		label: 'Date created',
		value: SortType.CREATED_AT,
	},
	{
		label: 'Last modified',
		value: SortType.UPDATED_AT,
	},
];
