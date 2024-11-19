import request from '@/utils/request';

export function getTableListData(data) {
  return request({
    url: '/table/table-list',
    method: 'get',
    data,
  });
}
