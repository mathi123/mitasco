# https
## generate certificate
Generate private key / certificate:

    openssl genrsa -des3 -out server.key 1024
   
Generate certificate signing request (CSR):

    openssl req -new -key server.key -out server.csr

Remove password from key:

    openssl rsa -in server.key -out server.key
    
Sign it yourself:

    openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

Common name is 'localhost'

## production certificate
Sign the production certificate with [let's encrypt](https://letsencrypt.org/).