#!/bin/bash

set -ueo pipefail

#tag
tag=$1

#run test
npm run "$tag" || true

#report
npm run report