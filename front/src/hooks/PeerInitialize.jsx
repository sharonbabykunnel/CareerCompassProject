const initializePeer = () => {
    if (!peerRef.current) {
      const peer = new Peer({
        path: '/peerjs',
        host: 'localhost',
        port: 5000
      });
  
      peer.on('open', (id) => {
        peerRef.current = peer;
      });
  
      peer.on('error', (error) => {
        console.error('PeerJS error:', error);
      });
    }
    return peerRef.current;
  };