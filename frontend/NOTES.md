 - Connect.Dev-FE
 - daisyUI => component library for tailwind css
 - to connect backend with frontend we need cors() 
 -cors contain (origin, credentials) as well as in frontend to when calling axios .



 #Deployment
  - Signup on AWS 
    - Launch instance
    - chmod 400 <secret>.pem(depends on system)
    - ssh -i "ConnectDev_SECRET.pem" ubuntu@ec2-13-48-104-170.eu-north-1.compute.amazonaws.com
    - Install Node version 22.16.0
    - Git clone
    - Frontend    
        - npm install  -> dependencies install
        - npm run build
        - sudo apt update
        - sudo apt install nginx
        - sudo systemctl start nginx
        - sudo systemctl enable nginx
        - Copy code from dist(build files) to /var/www/html/
        - sudo scp -r dist/* /var/www/html/
        - Enable port :80 of your instance
    
    - Backend
        - updated DB password
        - allowed ec2 instance public IP on mongodb server(0.0.0.0/0)
        - npm intsall pm2 -g
        - pm2 start npm --name "Connect.dev-backend" -- start
        - pm2 logs(to check if some error occurs)
        - pm2 list, pm2 flush <name> (to clear logs) , pm2 stop <name>, pm2 delete <name>
   IMP  - config nginx - /etc/nginx/sites-available/default
   IMP  - restart nginx - sudo systemctl restart nginx
        - Modify the BASEURL in frontend project to "/api"