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

        
# Ngxinx config: 

        Frontend = http://43.204.96.49/
        Backend = http://43.204.96.49:7777/
    
        Domain name = devtinder.com => 43.204.96.49

        Frontend = devtinder.com
        Backend = devtinder.com:7777 => devtinder.com/api

        nginx config : 

        server_name 43.204.96.49;

        location /api/ {
            proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }


# Adding a custom Domain name

    - purchased domain name from godaddy
    - signup on cloudflare & add a new domain name
    - change the nameservers on godaddy and point it to cloudflare
    - wait for sometime till your nameservers are updated ~15 minutes
    - DNS record: A devtinder.in 43.204.96.49
    - Enable SSL for website (secure-website)


# Sending Emails via SES

    - Create a IAM user
    - Give Access to AmazonSESFullAccess
    - Amazon SES: Create an Identity
    - Verify your domain name
    - Verify an email address identity
    - Install AWS SDK - v3 
    - Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
    - Setup SesClient
    - Access Credentials should be created in IAm under SecurityCredentials Tab
    - Add the credentials to the env file
    - Write code for SESClient
    - Write code for Sending email address
    - Make the email dynamic by passing more params to the run function


# Scheduling cron jobs in NodeJS
    - Installing node-cron
    - Learning about cron expressions syntax - crontab.guru
    - Schedule a job
    - date-fns
    - Find all the unique  email Id who have got connection Request in previous day
    - Send Email
    - Explore queue mechanim to send bulk emails
    - Amazon SES Bulk Emails
    - Make sendEmail function dynamic
    - bee-queue & bull npm packages
