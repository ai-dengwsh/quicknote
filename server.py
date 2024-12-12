from http.server import HTTPServer, SimpleHTTPRequestHandler
import socket
import sys
import webbrowser
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

def run(port=8000):
    try:
        server_address = ('', port)
        httpd = HTTPServer(server_address, CustomHandler)
        print(f'Starting server on port {port}...')
        print(f'Visit http://localhost:{port}')
        
        # 自动打开浏览器
        webbrowser.open(f'http://localhost:{port}')
        
        httpd.serve_forever()
    except socket.error as e:
        if e.errno == 10013:
            print(f"Error: Port {port} requires elevated privileges.")
            print("Try using a port number above 1024")
            sys.exit(1)
        elif e.errno == 10048:
            print(f"Error: Port {port} is already in use.")
            print("Try a different port number")
            sys.exit(1)
        else:
            raise e
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()
        sys.exit(0)

if __name__ == '__main__':
    run(8000)