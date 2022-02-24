# Creating an IOT thing using pulumi

## Instructions

create a .env file with the content:

```env
REGION="us-east-1"
ACCOUNTID="youraccountid"
```

```bash
# To create
pulumi up

# Once created, to dump the certs
pulumi stack output --show-secrets
```
