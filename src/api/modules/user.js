import request from '@/utils/request';
import servers from '../servers';

export function getInfo () {
  return request({
    url: `${servers.ibmsx}/projectInfo/queryList`,
    method: 'get',
  });
}

export function logout () {
  return request({
    url: `${servers.ibmsx}/logout`,
    method: 'post',
  });
}
