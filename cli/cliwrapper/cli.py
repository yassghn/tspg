"""cli.py"""

import argparse
import subprocess

def run():
    """main"""
    print('python cli wrapper\n')

    parser = argparse.ArgumentParser()
    parser.add_argument('playCall')
    args = parser.parse_args()

    cmd = 'bun'
    cmdArgs = ['bun', 'run', '.', args.playCall]

    try:
        #output = subprocess.check_output([cmd, cmdArgs], text=True)
        output = subprocess.check_output(cmdArgs, text=True)

        #output = run(['bun'], check=True, stdout=subprocess.PIPE).stdout
        print(output)
    except:
        print('error')

    return 0