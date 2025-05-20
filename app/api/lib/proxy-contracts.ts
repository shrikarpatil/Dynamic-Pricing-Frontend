export interface ProxyRequest {
  link: string; 
  data?: any; 
}

export interface ProxyResponse {
  status:number
  data?: any;
  error?: string;
}
