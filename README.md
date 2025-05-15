# typescript playground

typescriipt experimenotation

## setup

### python cli wrapper

#### pyenv

install

```boo
# (from admin boo)
scoop install pyenv
```

set local python version for project

```boo
pyenv update
pyenv install --list
echo 3.14.0a7 > .python-version
pyenv install <version>
pyenv local <version>
```

#### virtualenv

```boo
python -m venv ./cli
```

activate for your boo

```boo
./cli/Scripts/Activate.ps1
```

```boo
deactivate
```

#### requirements

```boo
pip install -r ./requirements.txt
```

### bun

```boo
bun i
```

## run

### cli wrapper

```boo
./cli/Scripts/Activate.ps1

python cli
python -m cli

python cli api.types.theBasics
python cli scratchpad.experimental.struct
```

## license

[OUI](/license)