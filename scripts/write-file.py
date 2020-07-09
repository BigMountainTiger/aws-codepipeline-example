import os
import boto3

ssm = boto3.client('ssm')
parameter = ssm.get_parameter(Name='P1')

content = parameter['Parameter']['Value']

dir = os.path.expanduser('~/.aws/')

if not os.path.exists(dir):
    os.makedirs(dir)

f = open(dir + 'credentials', 'w')
f.write(content)