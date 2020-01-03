// 封装axios url实现配置基准路径

// 引入axios
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

// 暴露axios
export default axios
