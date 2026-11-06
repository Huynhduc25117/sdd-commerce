import { useEffect, useState } from 'react';
import { Alert, AppBar, Box, Button, Container, CssBaseline, Paper, Stack, Toolbar, Typography } from '@mui/material';
export default function App() {
  const [status, setStatus] = useState('Đang kiểm tra API...');
  const [error, setError] = useState(false);
  async function check() {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStatus(`${data.service}: ${data.status}`); setError(false);
    } catch { setStatus('Không kết nối được Backend'); setError(true); }
  }
  useEffect(() => { check(); }, []);
  return <><CssBaseline/><AppBar position="static"><Toolbar><Typography variant="h6">SDD Commerce</Typography></Toolbar></AppBar><Container maxWidth="md"><Box sx={{ mt: 8 }}><Paper sx={{ p: 4 }}><Stack spacing={2}><Typography variant="h4">SDD Commerce — Khởi tạo thành công</Typography><Typography>React + Vite + MUI đã sẵn sàng.</Typography><Alert severity={error ? 'error' : 'info'}>{status}</Alert><Button variant="contained" onClick={check}>Kiểm tra lại API</Button></Stack></Paper></Box></Container></>;
}
