# typescript playground

typescriipt experimenotation

## setup

### python cli wrapper

#### pyenv

install

```shell
# (from admin shell)
scoop install pyenv
```

set local python version for project

```shell
pyenv update
pyenv install --list
echo 3.14.0a7 > .python-version
pyenv install <version>
pyenv local <version>
```

#### virtualenv

```shell
python -m venv ./cli
```

activate for your shell

```shell
./cli/Scripts/Activate.ps1
```

```shell
deactivate
```

#### requirements

```shell
pip install -r ./requirements.txt
```

### bun

```shell
bun i
```

## run

### cli wrapper

```shell
./cli/Scripts/Activate.ps1
python cli
python -m cli
```
